package nl.frapcoder.workout;

import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle state) {
        registerPlugin(WorkoutNativePlugin.class);
        super.onCreate(state);
        // Own native insets on every WebView version. Capacitor's automatic mode
        // passes them through on WebView 140+, allowing page content under bars.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        View decor = getWindow().getDecorView();
        decor.setBackgroundColor(android.graphics.Color.rgb(13, 22, 41));
        ViewCompat.setOnApplyWindowInsetsListener(decor, (view, insets) -> {
            int bars = WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout();
            Insets safe = insets.getInsets(bars);
            Insets keyboard = insets.getInsets(WindowInsetsCompat.Type.ime());
            view.setPadding(safe.left, safe.top, safe.right, Math.max(safe.bottom, keyboard.bottom));
            return new WindowInsetsCompat.Builder(insets)
                .setInsets(bars | WindowInsetsCompat.Type.ime(), Insets.NONE)
                .build();
        });
        decor.post(() -> ViewCompat.requestApplyInsets(decor));
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
