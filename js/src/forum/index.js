import {extend} from 'flarum/common/extend';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import Button from 'flarum/common/components/Button';
import UserCard from 'flarum/forum/components/UserCard';
import UserControls from 'flarum/forum/utils/UserControls';
import StatusModal from './components/StatusModal';

/* global app, m */

app.initializers.add('clarkwinkelmann-status', () => {
    extend(SessionDropdown.prototype, 'items', function (items) {
        if (app.session.user.attribute('clarkwinkelmannStatusCanEdit')) {
            items.add('clarkwinkelmann-status', Button.component({
                icon: 'fas fa-grin',
                onclick() {
                    app.modal.show(StatusModal, {
                        user: app.session.user,
                    });
                },
            }, app.translator.trans('clarkwinkelmann-status.forum.menu.set-status')));
        }
    });

    extend(UserControls, 'userControls', function (items, user) {
        if (user.attribute('clarkwinkelmannStatusCanEdit')) {
            items.add('clarkwinkelmann-status', Button.component({
                icon: 'fas fa-grin',
                onclick() {
                    app.modal.show(StatusModal, {
                        user,
                    });
                },
            }, app.translator.trans('clarkwinkelmann-status.forum.menu.set-status')));
        }
    });

    extend(UserCard.prototype, 'infoItems', function (items) {
        const user = this.attrs.user;

        if (user.attribute('clarkwinkelmannStatusEmoji') || user.attribute('clarkwinkelmannStatusText')) {
            items.add('clarkwinkelmann-status', m('.ClarkWinkelmannStatus', [
                user.attribute('clarkwinkelmannStatusEmoji') ? m('span.ClarkWinkelmannStatusEmoji', user.attribute('clarkwinkelmannStatusEmoji')) : null,
                ' ',
                user.attribute('clarkwinkelmannStatusText') ? m('span.ClarkWinkelmannStatusText', user.attribute('clarkwinkelmannStatusText')) : null,
            ]), -100);
        }
    });
});
