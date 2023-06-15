package com.jobber.componentsnative;


import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.jobber.componentsnative.dialogqueue.adapters.ActionSheetAdapter;
import com.jobber.componentsnative.dialogqueue.broadcastreceivers.DialogShowBroadcastReceiver;
import com.jobber.componentsnative.dialogqueue.managers.DialogQueueManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.LinkedHashMap;
import java.util.Objects;


@ReactModule(name = AtlantisNativeInterface.NAME)
public class AtlantisNativeInterface extends ReactContextBaseJavaModule {
    private final static String LOG_TAG = "ATLANTIS_INTERFACE";
    public static final String NAME = "AtlantisNativeInterface";

    public final static String CONFIRMATION_DIALOG_INTENT_NAME = "confirm this please";


    private static ReactApplicationContext reactContext;
    private static ReactActivity mainActivity;

    private static final LinkedHashMap<String, Object> pendingEvents = new LinkedHashMap<>();
    private DialogShowBroadcastReceiver mDialogShowBroadcastReceiver;



    @NonNull
    public String getName() {
        return NAME;
    }


    AtlantisNativeInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(mActivityEventListener);

    }

    private final LifecycleEventListener mActivityEventListener = new LifecycleEventListener() {

        @Override
        public void onHostResume() {
            Log.i(LOG_TAG, "onResult called");
            DialogQueueManager.initialize();
            setUpBroadcastReceivers();

        }

        @Override
        public void onHostPause() {

        }

        @Override
        public void onHostDestroy() {
            tearDownBroadcastReceivers();
        }


    };

    private void setUpBroadcastReceivers() {
        setupDialogShowBroadcastReceiver();
    }

    private void setupDialogShowBroadcastReceiver() {
        IntentFilter filter = DialogShowBroadcastReceiver.getIntentFilter();
        if (mDialogShowBroadcastReceiver == null) {
            mDialogShowBroadcastReceiver = new DialogShowBroadcastReceiver(this.getCurrentActivity());
            LocalBroadcastManager.getInstance(this.getReactApplicationContext()).registerReceiver(mDialogShowBroadcastReceiver, filter);
        }

    }


    private void tearDownBroadcastReceivers() {
        BroadcastReceiver[] broadcastReceivers = new BroadcastReceiver[]{
                 mDialogShowBroadcastReceiver
        };
        for(BroadcastReceiver broadcastReceiver : broadcastReceivers) {
            if(broadcastReceiver != null) {
                LocalBroadcastManager.getInstance(this.getReactApplicationContext()).unregisterReceiver(broadcastReceiver);
            }
        }
    }

    @ReactMethod
    public void openActionSheet(String dialogJsonData, Promise promise) {
        try {
            JSONObject dialogData = new JSONObject(dialogJsonData);

            JSONArray actions = dialogData.getJSONArray("actions");
            CharSequence title = dialogData.getString("title");
            CharSequence[] choices = new CharSequence[actions.length()];
            int[] actionValue = new int[actions.length()];

            for (int index = 0; index < actions.length(); index++) {
                choices[index] = actions.getJSONObject(index).getString("title");
                actionValue[index] = Integer.parseInt(actions.getJSONObject(index).getString("value"));
            }

            ActionSheetAdapter dialog = new ActionSheetAdapter(
                    title,
                    choices,
                    new ActionSheetAdapter.ActionSheetListener() {
                        @Override
                        public void onComplete(int choiceIndex) {
                            if (choiceIndex == -1 ) {
                                promise.reject("Cancel", "Cancelled by user");
                            } else {
                                promise.resolve(actionValue[choiceIndex]);
                            }
                        }
                    }
            );

            DialogQueueManager dialogQueueManager = DialogQueueManager.getInstance();
            dialogQueueManager.addAndShowDialog(dialog, this.getCurrentActivity());
        } catch (JSONException e) {
            Log.e(LOG_TAG, "Error trying to deserialize JSON data", e);
            promise.reject("Error", "Exception throw trying to deserialize JSON data");
        }
    }














}


