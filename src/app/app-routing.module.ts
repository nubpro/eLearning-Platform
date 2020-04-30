import { NgModule } from '@angular/core';
import {
    PreloadAllModules,
    RouterModule,
    Routes,
    NoPreloading
} from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then(m => m.AuthPageModule)
    },
    {
        path: 'tabs',
        canLoad: [AuthGuard],
        loadChildren: () =>
            import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'modules',
        canLoad: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/tabs/modules',
                pathMatch: 'full'
            },
            {
                path: ':intake_code/:module_code',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('./modules/module-videos/module-videos.module').then(
                        m => m.ModuleVideosPageModule
                    )
            }
        ]
    },
    {
        path: 'quizzes',
        canLoad: [AuthGuard],
        children: [
            {
                path: 'challenge/:video_id',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import(
                        './quizzes/quiz-challenge/quiz-challenge.module'
                    ).then(m => m.QuizChallengePageModule)
            },
            {
                path: 'manage/:video_id',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('./quizzes/quiz-list/quiz-list.module').then(
                        m => m.QuizListPageModule
                    )
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
