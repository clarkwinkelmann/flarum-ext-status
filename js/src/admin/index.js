import {extend} from 'flarum/extend';
import app from 'flarum/app';
import StatusSettingsModal from './components/StatusSettingsModal';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('clarkwinkelmann/status', () => {
    app.extensionSettings['clarkwinkelmann-status'] = () => app.modal.show(new StatusSettingsModal());

    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('clarkwinkelmann-status-see', {
            icon: 'fas fa-grin',
            label: app.translator.trans('clarkwinkelmann-status.admin.permissions.see'),
            permission: 'clarkwinkelmann-status.see',
            allowGuest: true,
        });

        items.add('clarkwinkelmann-status-set', {
            icon: 'fas fa-grin',
            label: app.translator.trans('clarkwinkelmann-status.admin.permissions.set'),
            permission: 'clarkwinkelmann-status.set',
        });

        items.add('clarkwinkelmann-status-mod', {
            icon: 'fas fa-grin',
            label: app.translator.trans('clarkwinkelmann-status.admin.permissions.mod'),
            permission: 'clarkwinkelmann-status.mod',
        });
    });
});
