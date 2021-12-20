import { Observable } from 'rxjs/internal/Observable';
import { AbstractControl } from '@angular/forms';
import { Observer } from 'rxjs/internal/types';
import { of } from 'rxjs/internal/observable/of';

/**
 * Validate mime type of file
 * 
 * @param control Form control to test
 * @returns Observable
 */
export const MimeTypeValidator = (control: AbstractControl
    ): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {

        if (typeof(control.value) === 'string') {

        /**
         * Return valid
         */
        return of(null);
    }

    const file: File = control.value as File;
    const fileReader: FileReader = new FileReader();
    const frObs: Observable<{[key: string]: any}> = new Observable((observer: Observer<{[key: string]: any}>) => {
        fileReader.addEventListener('loadend', () => {
            /**
             * Emit an new value that tells us if this is a valid file
             */

            /**
             * Access or read certain patterns in the file 
             * meta-data, that we can use to parse the mime type
             * 
             * We don't want to just check the file extension,
             * we really want to infer that file type, by looking
             * into that file
             */

            const arr: Uint8Array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
            let header: string = '';

            /**
             * Assume the file is not valid
             */
            let isValid: boolean = false;

            for (let i = 0; i < arr.length; i++) {

                /**
                 * Convert to a hexadecimal string
                 */
                header += arr[i].toString(16);
            }

            /**
             * File mime type Patterns that stand for certain 
             * file types(in this case: .png, .jpeg)
             */
            switch (header) {
                case "89504e47":
                  isValid = true;
                  break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                  isValid = true;
                  break;
                default:
                    /**
                     * Any other mime type is invalid
                     */
                  isValid = false; // Or you can use the blob.type as fallback
                  break;
              }

              if (isValid) {
                  /**
                   * Null means it is valid
                   */
                  observer.next(null);
              } else {
                  observer.next({ invalidMimeType: true })
              }

              /**
               * Let any subscribers know that we are done
               */
              observer.complete();
        });

        /**
         * Use fileReader to read in the file
         * 
         * Array buffer - allows us to access the mime type
         */
        fileReader.readAsArrayBuffer(file);
    });

    return frObs;
}