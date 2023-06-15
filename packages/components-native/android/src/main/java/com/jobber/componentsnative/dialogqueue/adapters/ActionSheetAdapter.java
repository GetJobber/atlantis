package com.jobber.componentsnative.dialogqueue.adapters;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;


public class ActionSheetAdapter extends AlertDialogAdapter {
    private CharSequence[] choices;
    private ActionSheetListener listener;
    private CharSequence title;
    private final String cancelText = "Cancel";

    public ActionSheetAdapter(
            CharSequence title,
            CharSequence[] choices,
            ActionSheetListener listener
    ) {
        this.choices = choices;
        this.listener = listener;
        this.title = title;
    }

    @Override
    public void setup(Activity activity) {
        setDialog(buildDialog(activity));
    }

    public interface ActionSheetListener {
        void onComplete(int choiceIndex);
    }

    private AlertDialog buildDialog(Activity activity) {
        return new AlertDialog.Builder(activity)
            .setCancelable(true)
            .setItems(choices, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    listener.onComplete(which);
                }
            })
            .setNegativeButton(cancelText, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int id) {
                    listener.onComplete(-1);
                }
            })
            .setTitle(title)
            .create();
    }
}
