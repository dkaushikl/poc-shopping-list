// Modules
import { AlimentOptionsPageModule } from './aliment-options/aliment-options.module';
import { FilteringOptionsPageModule } from './filtering-options/filtering-options.module';

// Popovers
export * from './aliment-options/aliment-options';
export * from './filtering-options/filtering-options';

// Export modules
export const ALL_POPOVER_MODULES = [
    AlimentOptionsPageModule,
    FilteringOptionsPageModule
];