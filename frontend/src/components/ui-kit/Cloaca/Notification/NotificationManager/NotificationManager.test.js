import { NotificationManager } from './index';
import { random } from 'lib-root/utils';

const notification = {
    preset: 'success',
    isFilled: false,
    ttl: 1000,
    children: 'Текст уведомления'
};

describe('NotificationManager', () => {
    let notificationManager = new NotificationManager();

    beforeEach(() => {
        notificationManager = new NotificationManager();
    });

    test('imports correctly', () => {
        expect(notificationManager).toBeDefined();
        expect(typeof notificationManager).toBe('object');
        expect(notificationManager).toBeInstanceOf(NotificationManager);
        expect(Object.keys(notificationManager).length).not.toBe(0);
    });

    test('setDefaultDuration works correctly', () => {
        expect(notificationManager.setDefaultDuration).toBeDefined();
        expect(typeof notificationManager.setDefaultDuration).toBe('function');

        expect(typeof notificationManager.defaultDuration).toBe('number');
        expect(notificationManager.defaultDuration).toBe(5000);

        const newValue = random(0, 10) * 1000;

        notificationManager.setDefaultDuration(newValue);
        expect(notificationManager.defaultDuration).toBe(newValue);
    });

    test('setDefaultNotification works correctly', () => {
        expect(notificationManager.setDefaultNotification).toBeDefined();
        expect(typeof notificationManager.setDefaultNotification).toBe('function');

        expect(typeof notificationManager.defaultNotification).toBe('object');

        const defaultNotification = { ...notificationManager.defaultNotification };

        notificationManager.setDefaultNotification(notification);

        const { defaultNotification: actualNotification } = notificationManager;

        expect(actualNotification).not.toEqual(defaultNotification);
        expect(actualNotification).toEqual(notification);
    });

    test('setAutoDispatchChanges works correctly', () => {
        expect(notificationManager.setAutoDispatchChanges).toBeDefined();
        expect(typeof notificationManager.setAutoDispatchChanges).toBe('function');

        expect(typeof notificationManager.autoDispatchChanges).toBe('boolean');
        expect(notificationManager.autoDispatchChanges).toBe(true);

        notificationManager.setAutoDispatchChanges(false);
        expect(notificationManager.autoDispatchChanges).toBe(false);
    });

    test('setMaxShowed works correctly', () => {
        expect(notificationManager.setMaxShowed).toBeDefined();
        expect(typeof notificationManager.setMaxShowed).toBe('function');

        expect(typeof notificationManager.maxShowed).toBe('number');
        expect(notificationManager.maxShowed).toBe(3);

        const newValue = random(0, 10);

        notificationManager.setMaxShowed(newValue);
        expect(notificationManager.maxShowed).toBe(newValue);
    });

    test('clearNotificationList works correctly', () => {
        expect(notificationManager.clearNotificationList).toBeDefined();
        expect(typeof notificationManager.clearNotificationList).toBe('function');

        const maxShowed = 3,
            length = random(4, 10);

        notificationManager.setMaxShowed(maxShowed);

        Array.from(Array(length)).forEach(() => notificationManager.addNotification(notification));

        notificationManager.clearNotificationList();

        expect(notificationManager.notificationList.length).toBe(0);
        expect(notificationManager.notificationList.length).toBe(0);
    });

    test('addNotification works correctly', () => {
        expect(notificationManager.addNotification).toBeDefined();
        expect(typeof notificationManager.addNotification).toBe('function');

        const maxShowed = 3,
            length = 7;

        notificationManager.setMaxShowed(maxShowed);

        Array.from(Array(length)).forEach(() => notificationManager.addNotification(notification));

        expect(notificationManager.notificationList.length).toEqual(maxShowed);
        expect(notificationManager.notificationWaitingList.length).toEqual(length - maxShowed);
    });

    test('removeNotificationById works correctly', () => {
        expect(notificationManager.removeNotificationById).toBeDefined();
        expect(typeof notificationManager.removeNotificationById).toBe('function');

        Array.from(Array(3)).forEach(() => notificationManager.addNotification(notification));

        const { id } = notificationManager.notificationList[0];
        expect(id).toBeTruthy();

        let found = notificationManager.notificationList.findIndex((item) => item.id === id);
        expect(found).not.toBe(-1);

        notificationManager.removeNotificationById(id);
        found = notificationManager.notificationList.findIndex((item) => item.id === id);
        expect(found).toBe(-1);
    });

    test('notification removes from notificationList after a defaultDuration', () => {
        notificationManager.setDefaultDuration(1000);

        jest.useFakeTimers();

        notificationManager.addNotification(notification);
        expect(notificationManager.notificationList.length).toBe(1);

        setTimeout(() => expect(notificationManager.notificationList.length).toBe(1), 500);
        setTimeout(() => expect(notificationManager.notificationList.length).toBe(0), 1500);

        jest.runAllTimers();
    });

    test('notification removes from notificationWaitingList after a ttl', () => {
        const duration = 5000,
            length = 7,
            maxShowed = 3,
            ttl = 1000;

        notificationManager.setDefaultDuration(duration);
        notificationManager.setMaxShowed(maxShowed);

        jest.useFakeTimers();

        Array.from(Array(length)).forEach(() => notificationManager.addNotification({ ...notification, ttl }));
        setTimeout(() => expect(notificationManager.notificationWaitingList.length).toBe(4), 500);
        setTimeout(() => expect(notificationManager.notificationWaitingList.length).toBe(0), 1500);

        jest.runAllTimers();
    });

    test('addChangeListener works correctly', () => {
        expect(notificationManager.addChangeListener).toBeDefined();
        expect(typeof notificationManager.addChangeListener).toBe('function');

        const mockFn = jest.fn();
        notificationManager.addChangeListener(mockFn);

        expect(notificationManager.changeListeners).not.toEqual({});
        expect(notificationManager.changeListeners[mockFn]).toEqual(mockFn);
    });

    test('removeChangeListener works correctly', () => {
        expect(notificationManager.removeChangeListener).toBeDefined();
        expect(typeof notificationManager.removeChangeListener).toBe('function');

        const mockFn1 = () => console.log('mockFn1'),
            mockFn2 = () => console.log('mockFn2');
        notificationManager.addChangeListener(mockFn1);
        notificationManager.addChangeListener(mockFn2);

        expect(notificationManager.changeListeners[mockFn1]).toBeDefined();
        expect(notificationManager.changeListeners[mockFn2]).toBeDefined();

        notificationManager.removeChangeListener(mockFn1);

        expect(notificationManager.changeListeners[mockFn1]).not.toBeDefined();
        expect(notificationManager.changeListeners[mockFn2]).toBeDefined();
    });

    test('clearChangeListeners works correctly', () => {
        expect(notificationManager.clearChangeListeners).toBeDefined();
        expect(typeof notificationManager.clearChangeListeners).toBe('function');

        notificationManager.addChangeListener(() => console.log('mockFn1'));
        notificationManager.addChangeListener(() => console.log('mockFn2'));

        notificationManager.clearChangeListeners();

        expect(notificationManager.changeListeners).toEqual({});
    });

    test('dispatchChanges works correctly', () => {
        expect(notificationManager.dispatchChanges).toBeDefined();
        expect(typeof notificationManager.dispatchChanges).toBe('function');

        const mockFn = jest.fn();
        notificationManager.addChangeListener(mockFn);

        notificationManager.dispatchChanges();
        expect(mockFn).toHaveBeenCalled();
    });
});
