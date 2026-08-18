<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages\ManageFaqs;
use App\Models\Faq;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('question')->required()->rows(2)->columnSpanFull(),
            Textarea::make('answer')->required()->rows(5)->columnSpanFull(),
            TextInput::make('sort_order')->label('Sort order')->numeric()->default(0),
            Toggle::make('is_published')->label('Published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question')->searchable()->limit(70),
                TextColumn::make('sort_order')->label('Order')->sortable(),
                TextColumn::make('is_published')->label('Published')->formatStateUsing(fn (bool $state): string => $state ? 'Yes' : 'No'),
                TextColumn::make('updated_at')->dateTime('d M Y H:i')->sortable(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([
                BulkActionGroup::make([DeleteBulkAction::make()]),
            ]);
    }

    public static function getPages(): array
    {
        return ['index' => ManageFaqs::route('/')];
    }
}
