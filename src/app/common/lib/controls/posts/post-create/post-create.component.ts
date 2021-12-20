import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { PostModel } from '../../../models/post.model';
import { MimeTypeValidator } from './mime-type.validator';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pio-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  protected mode: string;
  protected postId: string;
  public Form: FormGroup;
  public IsLoading: boolean;
  public post: PostModel;
  public ImagePreview: string | ArrayBuffer;
  protected authListenerSubscription: Subscription;

  constructor(
    protected postsService: PostsService, 
    protected activatedRoute: ActivatedRoute,
    protected authService: AuthService) {

      this.mode = 'create';
    }

    public ngOnInit(): void {

    /**
     * Listen for user authentication changes
     */
    this.authListenerSubscription = this.authService
      .GetAuthStatusListener()
      .subscribe((authStatus: any) => {
      this.IsLoading = false;
    })

      this.setupForm();

      this.activatedRoute.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.IsLoading = true;
          this.postsService.getPost(this.postId)
          .subscribe((postData: PostModel) => {
            this.IsLoading = false;
            this.post = 
            { 
              id: postData['_id'], 
              title: postData.title, 
              content: postData.content,
              imagePath: postData.imagePath,
              creator: postData.creator
            };

            /**
             * Initial values in case we already have a post
             */
            this.Form.setValue(
              {
                title: this.post.title, 
                content: this.post.content,
                image: this.post.imagePath
              });
          })
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
    }

    public ngOnDestroy(): void {
      this.authListenerSubscription.unsubscribe();
    }

    public OnImagePicked(evt: Event): void {
      const file: any = (evt.target as HTMLInputElement).files[0];

      /**
       * Patchvalue allows you to target a single control
       */
      this.Form.patchValue({ image: file });

      /**
       * This informs Angular that the value has changed
       * and it should reevaluate, store value, and 
       * check the value if it's valide(dynamically runs the validator) 
       */
      this.Form.get('image').updateValueAndValidity();
      
      /**
       * Create file reader
       */
      const reader: FileReader = new FileReader();

      /**
       * When the file is done loading, do something
       * 
       * This is asynchronous, which why we use this 
       * callback function
       */
      reader.onload = () => {
        this.ImagePreview = reader.result;
      }

      /**
       * Instruct to load the file
       */
      reader.readAsDataURL(file);
    }

  onSavePost() {
    if (this.Form.invalid) {
      return;
    }

    this.IsLoading = true;

    if (this.mode === 'create') {
      this.postsService.addPost(
        this.Form.value.title, 
        this.Form.value.content,
        this.Form.value.image);
    } else {
      this.postsService.updatePost(
        this.postId, 
        this.Form.value.title, 
        this.Form.value.content,
        this.Form.value.image);
    }
  
    this.Form.reset();
  }

  protected setupForm(): void {
    this.Form = new FormGroup({
      title: new FormControl(null, 
        {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }),
      content: new FormControl(null, 
        {
        validators: [
          Validators.required
        ]
      }),
      image: new FormControl(null, 
        {
          validators: [
            Validators.required
          ],
          asyncValidators: [
            MimeTypeValidator
          ]
        })
    });
  }
}
