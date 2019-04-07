package com.calendar;

import com.reactnativenavigation.NavigationActivity;

import org.devio.rn.splashscreen.SplashScreen; // import this
import android.os.Bundle; // import this

public class MainActivity extends NavigationActivity {

 @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
}

}
