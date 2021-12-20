import { PostsComponent } from './../posts/posts.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PostModel } from '../../../models/post.model';
import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'pio-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: PostModel[] = [];
  private postsSub: Subscription;
  public IsLoading: boolean;
  public TotalPosts: number = 0;
  public PostsPerPage: number = 2;
  public CurrentPage: number = 1;
  public PageSizeOptions: Array<number> = [1, 2, 5, 10];

  protected authListenerSubscription: Subscription;
  public UserId: string;
  public UserIsAuthenticated: boolean;

  constructor(
    public postsService: PostsService,
    protected authService: AuthService) { }

  ngOnInit() {

    this.IsLoading = true;

    /**
     * Get all posts
     */
    this.postsService.getPosts(this.PostsPerPage, this.CurrentPage);

    /**
     * Get current user id
     */
    this.UserId = this.authService.GetUserId();

    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: PostModel[], postCount: number }) => {
        this.IsLoading = false;
        this.TotalPosts = postData.postCount;
        this.posts = postData.posts;
        this.UserId = this.authService.GetUserId();
      });

    /**
     * On load check for user authentication
     */
    this.UserIsAuthenticated = this.authService.GetIsAuth();

    /**
     * Listen for authentication changes
     */
    this.authListenerSubscription = this.authService
      .GetAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.UserIsAuthenticated = isAuthenticated;
      })
  }

  public OnDelete(id: string): void {

    this.IsLoading = true

    this.postsService.deletePost(id)
      .subscribe(() => {

        /**
         * Refetch data
         */
        this.postsService.getPosts(this.PostsPerPage, this.CurrentPage);
      },
      () => {
        this.IsLoading = false;
      });
  }

  /**
   * On pagination changed
   * 
   * @param evt pagination event
   */
  public OnPageChanged(pageData: PageEvent): void {
    this.IsLoading = true;
    this.CurrentPage = pageData.pageIndex + 1;
    this.PostsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.PostsPerPage, this.CurrentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    // this.authListenerSubscription.unsubscribe();
  }
}
