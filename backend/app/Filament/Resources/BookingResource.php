<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages\ManageBookings;
use App\Models\Booking;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('status')
                ->options([
                    'reserved' => 'Reserved',
                    'confirmed' => 'Confirmed',
                    'failed' => 'Failed',
                    'cancelled' => 'Cancelled',
                ])
                ->required(),
            Textarea::make('internal_notes')
                ->label('Internal notes')
                ->rows(6)
                ->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')->label('Received')->dateTime('d M Y H:i')->sortable(),
                TextColumn::make('full_name')->label('Name')->searchable(),
                TextColumn::make('email')->searchable(),
                TextColumn::make('phone')->searchable(),
                TextColumn::make('service')->searchable()->limit(35),
                TextColumn::make('preferred_date')->label('Date')->date('d M Y')->sortable(),
                TextColumn::make('preferred_time')->label('Time'),
                TextColumn::make('status')->badge(),
                TextColumn::make('calendar_status')->label('Calendar')->badge(),
                TextColumn::make('notification_status')->label('Email')->badge(),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                EditAction::make(),
            ]);
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
        return ['index' => ManageBookings::route('/')];
    }
}
