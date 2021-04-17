/* global app */

app.initializers.add('clarkwinkelmann-status', () => {
    app.extensionData.for('clarkwinkelmann-status')
        .registerSetting({
            setting: 'clarkwinkelmann-status.onlyCountries',
            type: 'switch',
            label: app.translator.trans('clarkwinkelmann-status.admin.settings.only-countries')
        })
        .registerSetting({
            setting: 'clarkwinkelmann-status.enableText',
            type: 'switch',
            label: app.translator.trans('clarkwinkelmann-status.admin.settings.enable-text')
        })
        .registerPermission({
            icon: 'fas fa-grin',
            label: app.translator.trans('clarkwinkelmann-status.admin.permissions.see'),
            permission: 'clarkwinkelmann-status.see',
            allowGuest: true,
        }, 'view')
        .registerPermission({
            icon: 'fas fa-grin',
            label: app.translator.trans('clarkwinkelmann-status.admin.permissions.set'),
            permission: 'clarkwinkelmann-status.set',
        }, 'view')
        .registerPermission({
            icon: 'fas fa-grin',
            label: app.translator.trans('clarkwinkelmann-status.admin.permissions.mod'),
            permission: 'clarkwinkelmann-status.mod',
        }, 'view');
});
