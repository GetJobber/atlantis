package com.jobber.componentsnative.dialogqueue.adapters;


import android.app.Activity;
import com.jobber.componentsnative.dialogqueue.listeners.DismissListener;


/**
 * A simple interface for dialogs that can be queued for displaying to the screen.
 */
public abstract class DialogAdapter {

    private boolean hasBeenShown = false;

    /**
     * sets up the dialog with the passed in activity
     */
    public abstract void setup(Activity activity);

    /**
     * Calling show(), will show the dialog, if it has not already been shown.
     *
     * A dialog can only be shown once.
     */
    public void show(){
        if (hasBeenShown) {
            return;
        } else {
            hasBeenShown = true;
            presentYourself();
        }
    }

    /**
     * Actually show yourself!
     */
    public abstract void presentYourself();

    /**
     * set the listener for the event that fires when the dialog is dismissed/closed
     *
     * @param listener
     */
    public abstract void setOnDismissListener(DismissListener listener);

    /**
     * Returns the dismissListener (if one has been set)
     */
    public abstract DismissListener getDismissListener();

    /**
     * For permission request dialogs that we have no control over their dismissal.
     * Since we do know when they were dismissed, we can tell the dialogQueue that it should
     * dismiss the dialog for a certain requestCode.
     *
     * For all adapters that aren't the RequestPermissionDialogAdapter, this will always return false.
     *
     * @param requestCode the permission requestCode
     * @return if the dialog should be dismissed, if the permission requestCode was just completed.
     */
    public abstract boolean shouldBeDismissed(int requestCode);
}
