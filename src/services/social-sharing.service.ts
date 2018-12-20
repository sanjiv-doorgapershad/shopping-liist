import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SocialSharingService {

  constructor(private socialSharing: SocialSharing) {}

  public share(message) {
    this.socialSharing.share(`shoppinglist://home/shopping-list/${message}`, "Shopping List Items").then(() => {

    }).catch(() => {

    });
  }

  public shareViaWhatsApp() {
    this.socialSharing.shareViaWhatsApp("I am a message from the shopping list app").then(() => {

    }).catch(() => {

    });
  }


}
