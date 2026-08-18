<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SubjectResource\Pages\ManageSubjects;
use App\Models\Subject;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SubjectResource extends Resource
{
    protected static ?string $model = Subject::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')->required()->maxLength(255),
            TextInput::make('slug')->required()->maxLength(160)->unique(ignoreRecord: true),
            Textarea::make('tagline')->required()->rows(3)->columnSpanFull(),
            TextInput::make('intro_title')->label('Introduction title')->required()->columnSpanFull(),
            Textarea::make('intro_text')->label('Introduction text')->required()->rows(4)->columnSpanFull(),
            Repeater::make('outcomes')
                ->schema([
                    TextInput::make('title')->required(),
                    Textarea::make('desc')->label('Description')->required()->rows(2),
                ])
                ->collapsible()
                ->columnSpanFull(),
            TagsInput::make('topics')->required()->columnSpanFull(),
            Repeater::make('support')
                ->schema([
                    TextInput::make('title')->required(),
                    Textarea::make('desc')->label('Description')->required()->rows(2),
                ])
                ->collapsible()
                ->columnSpanFull(),
            Repeater::make('faqs')
                ->label('Subject FAQs')
                ->schema([
                    TextInput::make('q')->label('Question')->required(),
                    Textarea::make('a')->label('Answer')->required()->rows(3),
                ])
                ->collapsible()
                ->columnSpanFull(),
            Repeater::make('images')
                ->schema([
                    TextInput::make('src')->label('Image path / URL')->required(),
                    TextInput::make('alt')->label('Alt text')->required(),
                ])
                ->collapsible()
                ->columnSpanFull(),
            TextInput::make('sort_order')->label('Sort order')->numeric()->default(0),
            Toggle::make('is_published')->label('Published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('slug')->searchable(),
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
        return ['index' => ManageSubjects::route('/')];
    }
}
