import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

/* global m */

const settingsPrefix = 'clarkwinkelmann-status.';
const translationPrefix = 'clarkwinkelmann-status.admin.settings.';

export default class StatusSettingsModal extends SettingsModal {
    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        return [
            m('.Form-group', [
                Switch.component({
                    state: this.setting(settingsPrefix + 'onlyCountries')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + 'onlyCountries')(value ? '1' : '0');
                    },
                    children: app.translator.trans(translationPrefix + 'only-countries'),
                }),
            ]),
            m('.Form-group', [
                Switch.component({
                    state: this.setting(settingsPrefix + 'enableText')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + 'enableText')(value ? '1' : '0');
                    },
                    children: app.translator.trans(translationPrefix + 'enable-text'),
                }),
            ]),
        ];
    }
}
