package com.sntran.spoors;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.surialabs.rn.geofencing.GeoFencingPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.marianhello.react.BackgroundGeolocationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GeoFencingPackage(),
            new ReactVideoPackage(),
            new RCTCameraPackage(),
            new BackgroundGeolocationPackage(),
            new VectorIconsPackage(),
            new ReactNativeMapboxGLPackage(),
            new RNGeocoderPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
