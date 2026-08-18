<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages\ManageSiteSettings;
use App\Models\SiteSetting;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('label')->required()->maxLength(160),
            TextInput::make('key')->disabled()->dehydrated()->required(),
            TextInput::make('group')->disabled()->dehydrated()->required(),
            Textarea::make('value')
                ->label('Value (JSON)')
                ->rows(18)
                ->required()
                ->rule('json')
                ->formatStateUsing(
                    fn ($state): string => is_string($state)
                        ? $state
                        : (json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) ?: 'null')
                )
                ->dehydrateStateUsing(
                    fn (string $state): mixed => json_decode($state, true, 512, JSON_THROW_ON_ERROR)
                )
                ->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('label')->searchable(),
                TextColumn::make('key')->searchable(),
                TextColumn::make('group')->badge(),
                TextColumn::make('updated_at')->dateTime('d M Y H:i')->sortable(),
            ])
            ->recordActions([EditAction::make()]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return ['index' => ManageSiteSettings::route('/')];
    }
}
