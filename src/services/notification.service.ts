import { reactToastifyService } from "../config/react-toastify";
import { INotificationService } from "../interface/service/INotificationService";

class NotificationService {
  notificationService: INotificationService;
  constructor(notificationService: INotificationService) {
    this.notificationService = notificationService;
  }
  success(msg: string) {
    this.notificationService.success(msg);
  }
  error(msg: string) {
    this.notificationService.error(msg);
  }
}

export const notificationService = new NotificationService(
  reactToastifyService
);
