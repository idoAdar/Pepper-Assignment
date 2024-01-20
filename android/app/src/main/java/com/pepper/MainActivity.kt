package com.pepper

import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.i18nmanager.I18nUtil
import android.content.Context

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "pepper"

  //react-native-screens override
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null);
        val sharedI18nUtilInstance = I18nUtil.getInstance()
        sharedI18nUtilInstance.allowRTL(this, true)
        sharedI18nUtilInstance.forceRTL(this, true)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
