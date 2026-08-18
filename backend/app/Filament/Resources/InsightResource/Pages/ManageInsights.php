<?php

namespace App\Filament\Resources\InsightResource\Pages;

use App\Filament\Resources\InsightResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageInsights extends ManageRecords
{
    protected static string $resource = InsightResource::class;

    protected function getHeaderActions(): array
    {
        return [CreateAction::make()];
    }
}
