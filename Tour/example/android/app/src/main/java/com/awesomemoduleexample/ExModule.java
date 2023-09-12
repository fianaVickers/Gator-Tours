package com.awesomemoduleexample; // replace your-apps-package-name with your app’s package name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class ExModule extends ReactContextBaseJavaModule {
    ExModule(ReactApplicationContext context) {
        super(context);
    }
    
    @Override
    public String getName() {
        return "Ex";
    }

    @ReactMethod
    public void exTest(String name) {
        Log.d("ExModule", "Create event called with name: " + name);
    }
}