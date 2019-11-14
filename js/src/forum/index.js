import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SessionDropdown from 'flarum/components/SessionDropdown';
import Button from 'flarum/components/Button';
import UserCard from 'flarum/components/UserCard';
import UserControls from 'flarum/utils/UserControls';
import StatusModal from './components/StatusModal';

app.initializers.add('clarkwinkelmann/status', () => {
    extend(SessionDropdown.prototype, 'items', function (items) {
        if (app.session.user.attribute('clarkwinkelmannStatusCanEdit')) {
            items.add('clarkwinkelmann-status', Button.component({
                icon: 'fas fa-grin',
                children: app.translator.trans('clarkwinkelmann-status.forum.menu.set-status'),
                onclick() {
                    app.modal.show(new StatusModal({
                        user: app.session.user,
                    }));
                },
            }));
        }
    });

    extend(UserControls, 'userControls', function (items, user) {
        if (user.attribute('clarkwinkelmannStatusCanEdit')) {
            items.add('clarkwinkelmann-status', Button.component({
                icon: 'fas fa-grin',
                children: app.translator.trans('clarkwinkelmann-status.forum.menu.set-status'),
                onclick() {
                    app.modal.show(new StatusModal({
                        user,
                    }));
                },
            }));
        }
    });

    extend(UserCard.prototype, 'infoItems', function (items) {
        const user = this.props.user;

        if (user.attribute('clarkwinkelmannStatusEmoji') || user.attribute('clarkwinkelmannStatusText')) {
            items.add('clarkwinkelmann-status', m('.ClarkWinkelmannStatus', [
                user.attribute('clarkwinkelmannStatusEmoji'),
                ' ',
                user.attribute('clarkwinkelmannStatusText'),
            ]));
        }
    });
});
