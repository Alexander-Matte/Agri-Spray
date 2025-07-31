<?php

namespace App\Service;

class UnitConversionService
{
    // Volume conversions (Liters to Gallons)
    public const LITERS_TO_GALLONS = 0.264172;
    public const GALLONS_TO_LITERS = 3.78541;
    
    // Area conversions (Hectares to Acres)
    public const HECTARES_TO_ACRES = 2.47105;
    public const ACRES_TO_HECTARES = 0.404686;
    
    // Weight conversions (Kilograms to Pounds)
    public const KG_TO_POUNDS = 2.20462;
    public const POUNDS_TO_KG = 0.453592;

    /**
     * Convert liters to gallons for display
     */
    public function litersToGallons(float $liters): float
    {
        return round($liters * self::LITERS_TO_GALLONS, 2);
    }

    /**
     * Convert gallons to liters for storage
     */
    public function gallonsToLiters(float $gallons): float
    {
        return round($gallons * self::GALLONS_TO_LITERS, 2);
    }

    /**
     * Convert hectares to acres for display
     */
    public function hectaresToAcres(float $hectares): float
    {
        return round($hectares * self::HECTARES_TO_ACRES, 2);
    }

    /**
     * Convert acres to hectares for storage
     */
    public function acresToHectares(float $acres): float
    {
        return round($acres * self::ACRES_TO_HECTARES, 2);
    }

    /**
     * Convert kilograms to pounds for display
     */
    public function kgToPounds(float $kg): float
    {
        return round($kg * self::KG_TO_POUNDS, 2);
    }

    /**
     * Convert pounds to kilograms for storage
     */
    public function poundsToKg(float $pounds): float
    {
        return round($pounds * self::POUNDS_TO_KG, 2);
    }

    /**
     * Format volume for display with units
     */
    public function formatVolume(float $liters, bool $useGallons = true): string
    {
        if ($useGallons) {
            $gallons = $this->litersToGallons($liters);
            return sprintf('%.1f gal (%.1f L)', $gallons, $liters);
        }
        return sprintf('%.1f L', $liters);
    }

    /**
     * Format area for display with units
     */
    public function formatArea(float $hectares, bool $useAcres = true): string
    {
        if ($useAcres) {
            $acres = $this->hectaresToAcres($hectares);
            return sprintf('%.1f ac (%.1f ha)', $acres, $hectares);
        }
        return sprintf('%.1f ha', $hectares);
    }
} 