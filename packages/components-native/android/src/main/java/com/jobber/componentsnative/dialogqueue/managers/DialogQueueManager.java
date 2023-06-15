package com.jobber.componentsnative.dialogqueue.managers;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.jobber.componentsnative.dialogqueue.adapters.DialogAdapter;
import com.jobber.componentsnative.dialogqueue.broadcastreceivers.DialogShowBroadcastReceiver;
import com.jobber.componentsnative.dialogqueue.listeners.DismissListener;

import java.util.LinkedList;

/**
 * DialogQueueManger is our wrapper around all native UI elements, which include
 * - confirmation dialogs
 * - push notifications dialog
 * - permission rationale dialogs
 * - date picker dialog
 * - Zendesk
 * - android's permission request dialogs
 *
 * If you're adding a new native UI element, you should make it adhere to the dialog queue.
 *
 * <h1>How it works</h1>
 * This is a singleton. You can retrieve it with {@link DialogQueueManager#getInstance()} anywhere in the app
 * when dialogs need to be added to the queue.
 *
 * In order to add a Dialog to the queue, you'll need to implement {@link DialogAdapter},
 * see {@link com.jobber.componentsnative.dialogqueue.adapters.AlertDialogAdapter} for a good example.
 *
 * The DialogQueueManager works by displaying one dialog at a time, and once that dialog has been dismissed
 * (dismissed meaning the dialog is no longer on the screen), we display the next dialog (if one exists).
 *
 * <h2>{@link DialogQueueManager#addAndShowDialog}</h2>
 * Once a dialog has been passed in, we add it to the queue of dialogs ({@link #dialogs}), and then
 * if it's the only dialog in the queue, we display it immediately.
 *
 */
public class DialogQueueManager {
    private final static String LOG_TAG = "DIALOG_QUEUE";
    private static DialogQueueManager managerInstance;

    private LinkedList<DialogAdapter> dialogs = new LinkedList<DialogAdapter>();
//    private Application app;
//
//    private Activity activity;

    /**
     * Initialize the singleton instance of {@link DialogQueueManager}.
     * Subsequent calls will <b>not</b> create a new instance.
     * Typically called in {@link Application#onCreate()}
     */
    public static DialogQueueManager initialize() {
        if (managerInstance == null) {
            managerInstance = new DialogQueueManager();
        }
        return managerInstance;
    }

    /**
     * Get the initialized singleton instance. Must only be called after {@link #initialize()}
     *
     * @throws IllegalStateException if the singleton instance has not been initialized. {@link #initialize()} be must called first.
     */
    public static DialogQueueManager getInstance() {
        if (managerInstance == null) {
            throw new IllegalStateException("DialogQueueManager has not been initialized. Make sure it is initialized with #initialize(Application) before calling #getInstance()");
        }
        return managerInstance;
    }

    private DialogQueueManager() {
    }

    /**
     * Called when a new dialog should be shown.
     * If no dialogs are currently in the queue, the passed in dialog will be immediately shown, otherwise
     * the dialog will be shown once all of the previous dialogs have been dismissed.
     * @param dialog the dialog to be shown
     */
    public void addAndShowDialog(final DialogAdapter dialog, Activity activity) {
        dialogs.add(dialog);
        if (dialogs.size() == 1) {
            showNextDialog(activity);
        }
    }


    /**
     * Called when the next dialog should be shown.
     * When called sends out a SHOW_DIALOG intent to any listening receivers
     */

    public void showNextDialog(Activity activity) {
        if (!dialogs.isEmpty()) {
            DialogAdapter nextDialog = dialogs.peek();

            setupAndDisplayNextDialog(nextDialog, activity);
        }
    }


    private void setupAndDisplayNextDialog(DialogAdapter dialog, Activity activity) {
        dialog.setup(activity);
        dialog.setOnDismissListener(buildDismissListener(activity));
        dialog.show();
    }

    private DismissListener buildDismissListener(Activity activity) {
        return () -> {
            if (!dialogs.isEmpty()) {
                dialogs.pop();
                showNextDialog(activity);
            }
        };
    }



    public void removeAllDialogs() {
        this.dialogs.clear();
    }
}
