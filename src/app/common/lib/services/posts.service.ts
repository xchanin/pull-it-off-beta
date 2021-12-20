import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { environment } from '../../../../environments/environment';

const BACKEND_URL = environment.AWS_API + '/posts/';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<{ posts: Array<PostModel>, postCount: number }>();

  constructor(protected http: HttpClient, protected router: Router) {}

  /**
   * Return all posts
   * 
   * @param postsPerPage number of posts to show, per page, in pagination
   * @param currentPage current page we are on in the pagination
   */
  public getPosts(postsPerPage: number, currentPage: number) {

    /**
     * Setup query parameters
     */
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
    .get<{ message: string; posts: Array<PostModel>; maxPosts: number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(postData => {
        return { posts: postData.posts
        .map((post: any) => {
          /**
           * Convert returned data - in this case we are
           * removing the '_' from id that the database creates
           */
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          }
        }), 
        maxPosts: postData.maxPosts
      };
    }))
    /**
     * transformedPosts - result from the mapping above
     */
    .subscribe(transformedPostData => {
      console.log(transformedPostData);
      this.posts = transformedPostData.posts;

      /**
       * Emit data
       */
       this.postsUpdated.next({
        posts: [...this.posts],
        postCount: transformedPostData.maxPosts
      });
    });
  }

  public getPost(id: string): Observable<object> {
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>(
      BACKEND_URL + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  /**
   * Add a new post
   * 
   * @param title Post Title
   * @param content Post Content
   */
  public addPost(title: string, content: string, image: File) {
    // const post: PostModel = { id: null, title: title, content: content };

    /**
     * Data format that let's us combine text
     * values and blobs(file values)
     */
    const postData: FormData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: PostModel}>(
      BACKEND_URL, 
      postData
    )
    .subscribe((responseData) => {
      this.router.navigate([ '/posts' ]);
    });
  }

  public updatePost(id: string, title: string, content: string, image: File | string): void {
    
    let postData: PostModel | FormData;

    /**
     * If already exists
     */
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);

    } else {

      /**
       * Create new postData
       */
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        /**
         * Set to null here, but this is actually
         * handled on the backend, in post put service
         */
        creator: null
      };
    }

    this.http.put(BACKEND_URL + id, postData)
    .subscribe(response => {

      this.router.navigate(['/posts']);
    });
  }

  /**
   * Delete post
   * 
   * @param postId Id of post to delete
   */
  public deletePost(postId: string): Observable<Object> {
    return this.http.delete(BACKEND_URL + postId);
  }
}
