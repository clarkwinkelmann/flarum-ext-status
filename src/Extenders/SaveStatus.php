<?php

namespace ClarkWinkelmann\Status\Extenders;

use ClarkWinkelmann\Status\Policies\UserPolicy;
use ClarkWinkelmann\Status\Validators\EmojiValidator;
use ClarkWinkelmann\Status\Validators\TextValidator;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\AssertPermissionTrait;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;

class SaveStatus implements ExtenderInterface
{
    use AssertPermissionTrait;

    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->subscribe(UserPolicy::class);
        $container['events']->listen(Saving::class, [$this, 'saving']);
    }

    public function saving(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (array_key_exists('clarkwinkelmannStatusEmoji', $attributes)) {
            $this->assertCan($event->actor, 'clarkwinkelmannStatusEdit', $event->user);

            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $emoji = $attributes['clarkwinkelmannStatusEmoji'];

            /**
             * @var $validator EmojiValidator
             */
            $validator = app(EmojiValidator::class);

            if ($settings->get('clarkwinkelmann-status.onlyCountries')) {
                $validator->onlyFlags();
            }

            $validator->assertValid([
                'emoji' => $emoji,
            ]);

            $event->user->clarkwinkelmann_status_emoji = $emoji;

            if ($settings->get('clarkwinkelmann-status.enableText')) {
                $text = Arr::get($attributes, 'clarkwinkelmannStatusText');

                /**
                 * @var $validator TextValidator
                 */
                $validator = app(TextValidator::class);
                $validator->assertValid([
                    'text' => $text,
                ]);

                $event->user->clarkwinkelmann_status_text = $text;
            }
        }
    }
}
