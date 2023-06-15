package com.jobber.componentsnative.dialogqueue.adapters;


import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;


import com.jobber.componentsnative.dialogqueue.listeners.DismissListener;

abstract public class AlertDialogAdapter extends DialogAdapter {
    private static final String LOG_TAG = "AlertDialogAdapter";

    private AlertDialog dialog;
    private DismissListener dismissListener;

    /**
     * Called when the dialog should present itself to the world.
     *
     * You should be creating the dialog (and then calling `setDialog` to set the dialog)
     */
    @Override
    public abstract void setup(Activity activity);

    public void setDialog(AlertDialog dialog) {
        this.dialog = dialog;
    }

    @Override
    public void presentYourself() {
        if (this.dialog != null) {
            this.dialog.show();
        }
    }

    @Override
    public void setOnDismissListener(final DismissListener dismissListener) {
        if (dialog != null) {
            DialogInterface.OnDismissListener realListener = new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialog) {
                    dismissListener.onDismiss();
                }
            };
            dialog.setOnDismissListener(realListener);
            this.dismissListener = dismissListener;
        }
    }

    @Override
    public boolean shouldBeDismissed(int requestCode) {
        return false;
    }

    @Override
    public DismissListener getDismissListener() {
        return this.dismissListener;
    }
}
