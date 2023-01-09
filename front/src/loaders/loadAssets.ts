import logoImage from 'assets/icons/logo.png';
import banner01 from 'assets/banners/banner-01.png';
import banner02 from 'assets/banners/banner-02.jpg'
import banner03 from 'assets/banners/banner-03.jpg'
import icon01 from 'assets/icons/icon-01.png'
import icon02 from 'assets/icons/icon-02.png'
import icon03 from 'assets/icons/icon-03.png'
import aboutus from 'assets/banners/aboutus.png';
import payments from 'assets/icons/payments.png';
import property01 from 'assets/icons/Support.png';
import property02 from 'assets/icons/Account.png';
import property03 from 'assets/icons/Saving.png';
import visaIcon from 'assets/icons/visa.png';
import yandexIcon from 'assets/icons/yandex.png';

document.addEventListener('DOMContentLoaded', event => {
 
    Array.from(document.querySelectorAll('#logo')).forEach(
        element => element.setAttribute('src', logoImage)
    )

    
  
    if (document.querySelector('#banner-01')) {
        // @ts-ignore
        document.querySelector('#banner-01').style.cssText = `background: url(${banner01}) no-repeat center`;
    }

    if (document.querySelector('#banner-02')) {
        // @ts-ignore
        document.querySelector('#banner-02').style.cssText = `background: url(${banner02}) no-repeat center`;
    }

    if (document.querySelector('#banner-03')) {
        // @ts-ignore
        document.querySelector('#banner-03').style.cssText = `background: url(${banner03}) no-repeat center`;
    }

    if (document.getElementById('featureImage01')) {
        document.getElementById('featureImage01').setAttribute('src', icon01);
    }

    if (document.getElementById('featureImage02')) {
        document.getElementById('featureImage02').setAttribute('src', icon02);

    }

    if (document.getElementById('featureImage03')) {
        document.getElementById('featureImage03').setAttribute('src', icon03);

    }
  
    if(document.querySelector('.right-content')) {
        // @ts-ignore
        document.querySelector('.right-content').style.cssText = `background: url(${aboutus}) no-repeat center`;
    }

    document.getElementById('payments').setAttribute('src', payments);

    if(document.getElementById('property-01')) {
        document.getElementById('property-01').setAttribute('src', property01)
    }

    if(document.getElementById('property-02')) {
        document.getElementById('property-02').setAttribute('src', property02)
    }

    if(document.getElementById('property-03')) {
        document.getElementById('property-03').setAttribute('src', property03)
    }

    
    if(document.querySelector('.visaImage')) {
        document.querySelector('.visaImage').setAttribute('src', visaIcon)
    }

    if(document.querySelector('.yandexImage')) {
        document.querySelector('.yandexImage').setAttribute('src', yandexIcon)
    }
})
