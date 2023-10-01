import { ExtendedController } from '@libs/nest/ExtendedController';

@ExtendedController({
    path: 'templates',
    version: '1',
})
export class TemplatesController {
    // constructor(private readonly templatesService: TemplatesService) {}
    //
    // @Post()
    // create(@Body() createTemplateBody: CreateTemplateBody) {
    //     // return this.templatesService.create(createTemplateBody);
    // }
    //
    // @Get()
    // findAll(@Query() findTemplateQuery: FindTemplatesQuery) {
    //     // return this.templatesService.findAll(findTemplateQuery);
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     // return this.templatesService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTemplateBody: UpdateTemplateBody) {
    //     // return this.templatesService.update(+id, updateTemplateBody);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     // return this.templatesService.remove(+id);
    // }
}
