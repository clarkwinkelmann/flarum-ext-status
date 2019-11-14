<?php

namespace ClarkWinkelmann\Status\Extenders;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class UserAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            if ($event->actor->hasPermission('clarkwinkelmann-status.see')) {
                $event->attributes['clarkwinkelmannStatusEmoji'] = $event->model->clarkwinkelmann_status_emoji;
                $event->attributes['clarkwinkelmannStatusText'] = $event->model->clarkwinkelmann_status_text;
            }

            if ($event->actor->can('clarkwinkelmannStatusEdit', $event->model)) {
                $event->attributes['clarkwinkelmannStatusCanEdit'] = true;
            }
        }
    }
}
