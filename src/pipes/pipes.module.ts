import { NgModule } from '@angular/core';

import { ALL_PIPES } from '.';

@NgModule({
    declarations: [...ALL_PIPES],
    imports: [],
    exports: [...ALL_PIPES]
})
export class PipesModules { }