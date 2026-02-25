import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-scanner',
  templateUrl: 'scanner.page.html',
  styleUrls: ['scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  currentPage: string = 'scanner';
  isSupported = false;
  barcodes: Barcode[] = [];
  userData: any = null;
  apiUrl = 'https://zadarwatertaxi.com/api/code.php';
  bgColor = 'white';
  textColor = 'white';
  returnedData: any = null;
  private isModuleInstalled = false;
  private lastScannedCode: string | null = null;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('one-way-ticket')) {
        this.currentPage = 'one-way-ticket';
      } else if (event.url.includes('return-ticket')) {
        this.currentPage = 'return-ticket';
      } else if (event.url.includes('list')) {
        this.currentPage = 'list';
      } else if (event.url.includes('scanner')) {
        this.currentPage = 'scanner';
      }
      this.cdr.detectChanges();
    });
  }

  async ngOnInit() {
    try {
      const result = await BarcodeScanner.isSupported();
      this.isSupported = result.supported;
  
      try {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
      } catch (error: any) {
        if (error?.message?.includes('already installed')) {
          console.warn('Google Barcode Scanner Module was already installed.');
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error during initialization', error);
    }
  }
  


  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Please grant camera permission to use the barcode scanner.');
      return;
    }

    try {
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        const scannedCode = barcodes[0].rawValue;
        console.log('Scanned QR Code:', scannedCode); 
        this.validateQRCode(scannedCode);
      }
    } catch (error) {
      console.error('Error scanning barcode', error);
      this.presentAlert('Error scanning barcode.');
    }
  }

  async validateQRCode(qrCode: string) {
  try {
    const rawResponse: any = await firstValueFrom(
      this.http.post(this.apiUrl, { qrCode: qrCode })
    );

    console.log('Raw API response:', rawResponse);

    const response = Array.isArray(rawResponse) ? rawResponse[0] : rawResponse;

    if (response && response.response === 'Success') {
      if (qrCode === this.lastScannedCode) {
        this.updateBackgroundColor('returned');
        this.returnedData = response;
        this.userData = null;
        console.log('Returned ticket:', this.returnedData);
      } else {
        this.updateBackgroundColor('valid');
        this.userData = response;
        this.returnedData = null;
        this.lastScannedCode = qrCode;
        console.log('User data:', this.userData);
      }
    } else {
      this.userData = null;
      this.returnedData = null;
      this.lastScannedCode = null;
      this.updateBackgroundColor('sold');
    }
  } catch (error) {
    console.error('Error validating QR code', error);
    this.userData = null;
    this.returnedData = null;
    this.lastScannedCode = null;
    this.presentAlert('Failed to validate QR code.');
  }
}


  updateBackgroundColor(status: string) {
    switch (status) {
      case 'valid':
        this.bgColor = 'green';
        this.textColor = 'white';
        break;
      case 'sold':
        this.bgColor = 'red';
        this.textColor = 'white';
        break;
      case 'returned':
        this.bgColor = 'yellow';
        this.textColor = 'white';
        break;
      default:
        this.bgColor = 'white';
        break;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(message: string, header: string = 'Notice'): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  navOneway() {
    this.router.navigate(['/one-way-ticket']);
  }

  navReturnTicket() {
    this.router.navigate(['/return-ticket']);
  }

  navList() {
    this.router.navigate(['/list']);
  }

  navScanner() {
    this.router.navigate(['/scanner']);
  }

  navlogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
