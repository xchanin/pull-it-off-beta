import { AuthGuard } from '../common/lib/guards/auth.guard.ts.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../common/lib/pages/about-page/about-page.component';
import { EventsPageComponent } from '../common/lib/pages/events-page/events-page.component';
import { HomePageComponent } from '../common/lib/pages/home-page/home-page.component';
import { VideosPageComponent } from '../common/lib/pages/videos-page/videos-page.component';
import { PostCreateComponent } from '../common/lib/controls/posts/post-create/post-create.component';
import { PostsComponent } from '../common/lib/controls/posts/posts/posts.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, data: { tab: 1 } },
  { path: 'videos', component: VideosPageComponent, data: { tab: 2 }  },
  { path: 'events', component: EventsPageComponent, data: { tab: 3 }  },
  { path: 'about', component: AboutPageComponent, data: { tab: 4 }  },
  { path: 'posts', component: PostsComponent, data: { tab: 5 }  },
  { 
    path: 'post-create', 
    component: PostCreateComponent, 
    data: { tab: 7 },
    canActivate: [AuthGuard]  
  },
  { 
    path: 'post-edit/:postId', 
    component: PostCreateComponent, 
    data: { tab: 8 },
    canActivate: [AuthGuard]  
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('../common/modules/auth.module').then(m => m.AuthModule) }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
