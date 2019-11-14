<?php

namespace ClarkWinkelmann\Status\Extenders;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class ForumAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes['clarkwinkelmannStatusOnlyCountries'] = (bool)$settings->get('clarkwinkelmann-status.onlyCountries');
            $event->attributes['clarkwinkelmannStatusEnableText'] = (bool)$settings->get('clarkwinkelmann-status.enableText');
        }
    }
}
