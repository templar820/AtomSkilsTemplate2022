import uuidv4 from 'uuid/v4';

class NotificationManager {
    notificationList = [];
    notificationWaitingList = [];
    changeListeners = {};
    autoDispatchChanges = true;
    defaultDuration = 5000;
    defaultNotification = { preset: 'attention' };
    maxShowed = 3;

    setDefaultDuration = (duration) => {
        this.defaultDuration = duration;
    };

    setDefaultNotification = (notification) => {
        this.defaultNotification = notification;
    };

    setAutoDispatchChanges = (boolean) => {
        this.autoDispatchChanges = boolean;
    };

    setMaxShowed = (num) => {
        this.maxShowed = num;
    };

    clearTimeoutNotifications = (notificationList) => {
        notificationList.forEach((notification) => {
            clearTimeout(notification.timeoutId);
        });
    };

    // Clears all lists of notifications
    clearNotificationList = () => {
        this.clearTimeoutNotifications(this.notificationList);

        this.notificationList = [];
        this.notificationWaitingList = [];

        if (this.autoDispatchChanges) this.dispatchChanges();
    };

    clearChangeListeners = () => {
        this.changeListeners = {};
    };

    /** Adds notification to the notificationWaitingList. */
    _addWaitingNotification = ({ ttl, ...notification }) => {
        // If notification has ttl option sets timer to remove the notification.
        if (ttl) {
            const timeoutId = setTimeout(() => {
                this._removeWaitingNotificationById(notification.id);
            }, ttl);

            this.notificationWaitingList.push({ ...notification, timeoutId });
            return;
        }

        this.notificationWaitingList.push(notification);
    };

    /** Removes notification from the notificationWaitingList. */
    _removeWaitingNotificationById = (id) => {
        const index = this.notificationWaitingList.findIndex((item) => item.id === id);

        this.notificationWaitingList.splice(index, 1);
    };

    /** Adds notification to the notificationList.
     *  If the list is full, add to the notificationWaitingList. */
    addNotification = (notification) => {
        const { duration = this.defaultDuration, ...restNotification } = notification;
        const newNotification = {
            id: uuidv4(),
            ...this.defaultNotification,
            ...restNotification
        };

        // Add notification to the waiting list if notificationList is full
        if (this.notificationList.length >= this.maxShowed) {
            this._addWaitingNotification(newNotification);
            return;
        }

        // Clear ttl-timer for notification from the waiting list with ttl option
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }

        this.notificationList.push(newNotification);

        if (duration !== 0) {
            const timeoutId = setTimeout(() => {
                this.removeNotificationById(newNotification.id);
            }, duration);

            newNotification.timeoutId = timeoutId;
        }

        if (this.autoDispatchChanges) this.dispatchChanges();
    };

    /** Removes notification from the notificationList */
    removeNotificationById = (id) => {
        const index = this.notificationList.findIndex((item) => {
            const condition = item.id === id;
            condition && clearTimeout(item.timeoutId);
            return condition;
        });

        this.notificationList.splice(index, 1);

        // Add new notification to the notificationList from notificationWaitingList
        if (this.notificationWaitingList.length) {
            this.addNotification(this.notificationWaitingList[0]);
            this.notificationWaitingList.splice(0, 1);
        }

        if (this.autoDispatchChanges) this.dispatchChanges();
    };

    dispatchChanges = () => {
        Object.keys(this.changeListeners).forEach((callback) => {
            this.changeListeners[callback](this.notificationList);
        });
    };

    addChangeListener = (callback) => {
        this.changeListeners[callback] = callback;
    };

    removeChangeListener = (callback) => {
        delete this.changeListeners[callback];
    };
}

export default new NotificationManager();
export { NotificationManager };
