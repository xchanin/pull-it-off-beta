import { AuthInterceptor } from './common/lib/interceptors/auth.interceptor';
import { SlidesService } from './common/lib/services/slides.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericModalService } from './common/lib/services/generic-modal.service';
import { environment } from './../environments/environment';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@lcu/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './common/lib/controls/contact/contact.component';
import { FooterComponent } from './common/lib/controls/footer/footer.component';
import { HeaderComponent } from './common/lib/controls/header/header.component';
import { SlidesComponent } from './common/lib/controls/slides/slides.component';
import { VideoListComponent } from './common/lib/controls/video-list/video-list.component';
import { MouseMoveDirective } from './common/lib/directives/mouse-move.directive';
import { PullItOffDirective } from './common/lib/directives/pull-it-off.directive';
import { CursorComponent } from './common/lib/elements/cursor/cursor.component';
import { AboutPageComponent } from './common/lib/pages/about-page/about-page.component';
import { EventsPageComponent } from './common/lib/pages/events-page/events-page.component';
import { HomePageComponent } from './common/lib/pages/home-page/home-page.component';
import { VideosPageComponent } from './common/lib/pages/videos-page/videos-page.component';
import { NavigationComponent } from './common/lib/controls/navigation/navigation.component';
import { VideoPlayerComponent } from './common/lib/controls/video-player/video-player.component';
import { VideoService } from './common/lib/services/video/video.service';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { ScheduleAppointmentComponent } from './common/lib/controls/schedule-appointment/schedule-appointment.component';
import { PostListComponent } from './common/lib/controls/posts/post-list/post-list.component';
import { PostCreateComponent } from './common/lib/controls/posts/post-create/post-create.component';
import { PostsComponent } from './common/lib/controls/posts/posts/posts.component';
import { PostEditComponent } from './common/lib/controls/posts/post-edit/post-edit.component';
import { ErrorInterceptor } from './common/lib/interceptors/error.interceptor';
import { HttpErrorComponent } from './common/lib/controls/errors/http-error/http-error.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    SlidesComponent,
    VideoListComponent,
    MouseMoveDirective,
    PullItOffDirective,
    CursorComponent,
    AboutPageComponent,
    EventsPageComponent,
    HomePageComponent,
    VideosPageComponent,
    NavigationComponent,
    VideoPlayerComponent,
    ScheduleAppointmentComponent,
    PostListComponent,
    PostCreateComponent,
    PostsComponent,
    PostEditComponent,
    HttpErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatDialogModule
  ],
  providers: [
    VideoService,
    SlidesService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  entryComponents: [
    HttpErrorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
