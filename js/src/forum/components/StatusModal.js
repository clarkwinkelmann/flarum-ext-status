import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';

import emojiMap from 'simple-emoji-map';

/* global app, m */

const translationPrefix = 'clarkwinkelmann-status.forum.modal.';

export default class StatusModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);

        this.dirty = false;
        this.loading = false;
        this.emoji = this.attrs.user.attribute('clarkwinkelmannStatusEmoji') || '';
        this.text = this.attrs.user.attribute('clarkwinkelmannStatusText') || '';

        this.emojiPickOptions = {};

        Object.keys(emojiMap).forEach(emoji => {
            let emojiName = emojiMap[emoji][0];

            if (app.forum.attribute('clarkwinkelmannStatusOnlyCountries')) {
                if (emojiName.indexOf('flag_') !== 0) {
                    return;
                }

                emojiName = emojiName.replace('flag_', '').toUpperCase();
            }


            this.emojiPickOptions[emoji] = emojiName + ' ' + emoji;
        });

    }

    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    content() {
        return m('.Modal-body', [
            m('.ClarkWinkelmannStatusForm', [
                m('.Form-group', [
                    Select.component({
                        options: this.emojiPickOptions,
                        value: this.emoji,
                        onchange: value => {
                            this.emoji = value;
                            this.dirty = true;
                        },
                    }),
                ]),
                app.forum.attribute('clarkwinkelmannStatusEnableText') ? m('.Form-group', [
                    m('input.FormControl', {
                        disabled: this.loading,
                        type: 'text',
                        value: this.text,
                        oninput: event => {
                            this.text = event.target.value;
                            this.dirty = true;
                        },
                        placeholder: app.translator.trans(translationPrefix + 'text-placeholder'),
                    }),
                ]) : null,
            ]),
            m('.Form-group', [
                Button.component({
                    disabled: !this.dirty,
                    loading: this.loading,
                    className: 'Button Button--primary',
                    type: 'submit',
                }, app.translator.trans(translationPrefix + 'submit')),
                ' ',
                Button.component({
                    disabled: !this.attrs.user.attribute('clarkwinkelmannStatusEmoji') && !this.attrs.user.attribute('clarkwinkelmannStatusText'),
                    className: 'Button',
                    onclick: () => {
                        this.loading = true;

                        this.attrs.user.save({
                            clarkwinkelmannStatusEmoji: null,
                            clarkwinkelmannStatusText: null,
                        }).then(() => {
                            this.loading = false;
                            this.dirty = false;

                            app.modal.close();
                        }).catch(e => {
                            this.loading = false;

                            throw e;
                        });
                    },
                }, app.translator.trans(translationPrefix + 'clear')),
            ]),
        ]);
    }

    onsubmit(event) {
        event.preventDefault();

        this.loading = true;

        this.attrs.user.save({
            clarkwinkelmannStatusEmoji: this.emoji,
            clarkwinkelmannStatusText: this.text,
        }).then(() => {
            this.loading = false;
            this.dirty = false;

            app.modal.close();
        }).catch(e => {
            this.loading = false;

            throw e;
        });
    }
}
