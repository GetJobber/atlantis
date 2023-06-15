package com.jobber.componentsnative.dialogqueue.broadcastreceivers;


import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import com.jobber.componentsnative.dialogqueue.managers.DialogQueueManager;


public class DialogShowBroadcastReceiver extends BroadcastReceiver {

    private final static String INTENT_FILTER_TYPE = "DIALOG_SHOW";
    public final static String INTENT_ACTION_NAME = "Show dialog";

    private Activity mainActivity;

    public static IntentFilter getIntentFilter() {
        IntentFilter filter = new IntentFilter(INTENT_FILTER_TYPE);
        filter.addAction(INTENT_ACTION_NAME);
        return filter;
    }

    public DialogShowBroadcastReceiver(Activity mainActivity) {
        this.mainActivity = mainActivity;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
            DialogQueueManager.getInstance().showNextDialog(mainActivity);
    }
}
