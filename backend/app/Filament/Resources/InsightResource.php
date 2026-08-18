<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InsightResource\Pages\ManageInsights;
use App\Models\Insight;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class InsightResource extends Resource
{
    protected static ?string $model = Insight::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->required()->maxLength(255)->columnSpanFull(),
            TextInput::make('slug')->required()->maxLength(160)->unique(ignoreRecord: true),
            TextInput::make('category')->required()->maxLength(120),
            Textarea::make('excerpt')->required()->rows(3)->columnSpanFull(),
            DatePicker::make('published_at')->label('Published date')->required(),
            TextInput::make('reading_minutes')->label('Reading minutes')->numeric()->minValue(1)->maxValue(60)->default(5),
            TextInput::make('image')->label('Image path / URL')->columnSpanFull(),
            Repeater::make('content')
                ->label('Article paragraphs')
                ->simple(
                    Textarea::make('paragraph')->required()->rows(4),
                )
                ->columnSpanFull(),
            Toggle::make('is_published')->label('Published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable()->limit(55),
                TextColumn::make('category')->searchable(),
                TextColumn::make('published_at')->date('d M Y')->sortable(),
                TextColumn::make('reading_minutes')->label('Minutes')->sortable(),
                TextColumn::make('is_published')->label('Published')->formatStateUsing(fn (bool $state): string => $state ? 'Yes' : 'No'),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([
                BulkActionGroup::make([DeleteBulkAction::make()]),
            ]);
    }

    public static function getPages(): array
    {
        return ['index' => ManageInsights::route('/')];
    }
}
