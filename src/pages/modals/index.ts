// Modules
export * from './add-market/add-market.module';
export * from './add-new-list/add-new-list.module';

// Modal pages
export * from './add-market/add-market';
export * from './add-new-list/add-new-list';

// Group all modal modules
import { AddNewListPageModule } from './add-new-list/add-new-list.module';
import { AddMarketPageModule } from './add-market/add-market.module';

export const ALL_MODAL_MODULES = [
    AddNewListPageModule,
    AddMarketPageModule
];