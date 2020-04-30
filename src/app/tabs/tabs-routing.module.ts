import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'modules',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                '../modules/module-list/module-list.module'
                            ).then(m => m.ModuleListPageModule)
                    }
                ]
            },
            {
                path: 'notifications',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                '../notifications/notifications.module'
                            ).then(m => m.NotificationsPageModule)
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../account/account.module').then(
                                m => m.AccountPageModule
                            )
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/modules',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/modules',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}
