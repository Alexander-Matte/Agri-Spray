<?php

namespace App\DataTransformer;

use App\Service\UnitConversionService;
use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use ApiPlatform\Core\Serializer\AbstractItemNormalizer;

class UnitDisplayTransformer implements DataTransformerInterface
{
    public function __construct(
        private UnitConversionService $unitConverter
    ) {}

    public function transform($data, string $to, array $context = [])
    {
        if (!$data) {
            return $data;
        }

        // Add display units to the response
        if (isset($data['hopperCapacityLt'])) {
            $data['hopperCapacityDisplay'] = $this->unitConverter->formatVolume($data['hopperCapacityLt']);
        }

        if (isset($data['fieldSizeTotal'])) {
            $data['fieldSizeTotalDisplay'] = $this->unitConverter->formatArea($data['fieldSizeTotal']);
        }

        if (isset($data['fieldSizeSprayable'])) {
            $data['fieldSizeSprayableDisplay'] = $this->unitConverter->formatArea($data['fieldSizeSprayable']);
        }

        if (isset($data['chemicalAmount'])) {
            $data['chemicalAmountDisplay'] = $this->unitConverter->formatVolume($data['chemicalAmount']);
            $data['chemicalAmountGal'] = $this->unitConverter->litersToGallons($data['chemicalAmount']);
        }

        if (isset($data['waterAmount'])) {
            $data['waterAmountDisplay'] = $this->unitConverter->formatVolume($data['waterAmount']);
            $data['waterAmountGal'] = $this->unitConverter->litersToGallons($data['waterAmount']);
        }

        return $data;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return $data instanceof \stdClass && $to === 'json';
    }
} 