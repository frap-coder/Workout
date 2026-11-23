package nl.frapcoder.workout;

import android.os.Bundle;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle state) {
        registerPlugin(WorkoutNativePlugin.class);
        super.onCreate(state);
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (getBridge() == null) { moveTaskToBack(true); return; }
                getBridge().getWebView().evaluateJavascript(
                    "Boolean(globalThis.workoutHandleBack && globalThis.workoutHandleBack())",
                    result -> {
                        if (!"true".equals(result)) {
                            if (getBridge().getWebView().canGoBack()) getBridge().getWebView().goBack();
                            else moveTaskToBack(true);
                        }
                    }
                );
            }
        });
    }
}
