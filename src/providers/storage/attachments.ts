import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class AttachmentsProvider {

    constructor(private afStorage: AngularFireStorage) { }

    uploadAttachmentPictureToStorage(listId: string, imageBase64: string) {
        return this.afStorage.ref(`/attachments/${listId}/${new Date().getTime()}.jpeg`)
            .putString(imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', { contentType: 'image/jpg' })
            .percentageChanges();
    }

}