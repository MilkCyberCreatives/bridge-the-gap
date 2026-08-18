<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProgrammeResource\Pages\ManageProgrammes;
use App\Models\Programme;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProgrammeResource extends Resource
{
    protected static ?string $model = Programme::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->required()->maxLength(255),
            TextInput::make('short_title')->label('Short title')->required()->maxLength(120),
            TextInput::make('slug')->required()->maxLength(160)->unique(ignoreRecord: true),
            Textarea::make('summary')->required()->rows(4)->columnSpanFull(),
            TextInput::make('audience')->required()->maxLength(255)->columnSpanFull(),
            TagsInput::make('benefits')->required()->columnSpanFull(),
            TagsInput::make('focus_areas')->label('Focus areas')->required()->columnSpanFull(),
            Repeater::make('subject_lists')
                ->label('Subject / focus lists')
                ->schema([
                    TextInput::make('headline')->required(),
                    TagsInput::make('items')->required()->columnSpanFull(),
                ])
                ->columns(1)
                ->collapsible()
                ->columnSpanFull(),
            TextInput::make('image')->helperText('Use the existing /images/... path or a full hosted image URL.')->columnSpanFull(),
            TextInput::make('sort_order')->label('Sort order')->numeric()->default(0),
            Toggle::make('is_published')->label('Published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('short_title')->label('Short title'),
                TextColumn::make('audience')->limit(45),
                TextColumn::make('sort_order')->label('Order')->sortable(),
                TextColumn::make('is_published')->label('Published')->formatStateUsing(fn (bool $state): string => $state ? 'Yes' : 'No'),
                TextColumn::make('updated_at')->dateTime('d M Y H:i')->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageProgrammes::route('/'),
        ];
    }
}
