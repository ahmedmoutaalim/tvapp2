package com.tvtest

import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import java.io.ByteArrayOutputStream
import android.graphics.Bitmap

@ReactModule(name = InstalledAppsModule.NAME)
class InstalledAppsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "InstalledApps"
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun getInstalledApps(promise: Promise) {
        try {
            val pm: PackageManager = reactApplicationContext.packageManager
            val packages = pm.getInstalledApplications(PackageManager.GET_META_DATA)
            val appsList = WritableNativeArray()

            for (packageInfo in packages) {
                val launchIntent = pm.getLaunchIntentForPackage(packageInfo.packageName)
                if (launchIntent != null) {
                    val appInfo = WritableNativeMap()
                    appInfo.putString("appName", pm.getApplicationLabel(packageInfo).toString())
                    appInfo.putString("packageName", packageInfo.packageName)

                    val iconDrawable = pm.getApplicationIcon(packageInfo.packageName)
                    val base64Icon = drawableToBase64(iconDrawable)
                    appInfo.putString("iconBase64", base64Icon)

                    appsList.pushMap(appInfo)
                }
            }

            promise.resolve(appsList)
        } catch (e: Exception) {
            promise.reject("ERR", e)
        }
    }

    private fun drawableToBase64(drawable: Drawable): String? {
        return try {
            if (drawable is BitmapDrawable) {
                val bitmap = drawable.bitmap
                val outputStream = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
                val byteArray = outputStream.toByteArray()
                Base64.encodeToString(byteArray, Base64.DEFAULT)
            } else {
                null
            }
        } catch (e: Exception) {
            null
        }
    }

    @ReactMethod
    fun launchApp(packageName: String, promise: Promise) {
        try {
            val context = reactApplicationContext
            val launchIntent = context.packageManager.getLaunchIntentForPackage(packageName)
            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(launchIntent)
                promise.resolve(true)
            } else {
                promise.reject("ERR", "Cannot launch app: $packageName")
            }
        } catch (e: Exception) {
            promise.reject("ERR", e)
        }
    }
}
