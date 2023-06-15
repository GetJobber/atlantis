package com.jobber.componentsnative.dialogqueue.listeners;

import android.content.DialogInterface;

public class DialogDismissListener implements DismissListener {

    private static final String LOG_TAG = "DIALOG_DISMISS_LISTENER";

    private DialogInterface.OnDismissListener dismissListener;

    public DialogDismissListener(DialogInterface.OnDismissListener dismissListener) {
        this.dismissListener = dismissListener;
    }

    @Override
    public void onDismiss() {
        // Empty method since dialog handles this itself
    }
}
