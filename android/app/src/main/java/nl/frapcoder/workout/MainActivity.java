package nl.frapcoder.workout;

import android.os.Bundle;
import android.view.View;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
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
        int background = Color.rgb(13, 22, 41);
        getWindow().setBackgroundDrawable(new ColorDrawable(background));
        decor.setBackgroundColor(background);
        View content = findViewById(android.R.id.content);
        content.setBackgroundColor(background);
        WindowCompat.getInsetsController(getWindow(), decor).setAppearanceLightStatusBars(false);
        WindowCompat.getInsetsController(getWindow(), decor).setAppearanceLightNavigationBars(false);
        // Pad the content container: its background paints the entire safe area,
        // including transparent Android 15/16 system bars. Decor padding can expose
        // AppCompat's light status-bar background instead.
        ViewCompat.setOnApplyWindowInsetsListener(content, (view, insets) -> {
            int bars = WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout();
            Insets safe = insets.getInsets(bars);
            Insets keyboard = insets.getInsets(WindowInsetsCompat.Type.ime());
            view.setPadding(safe.left, safe.top, safe.right, Math.max(safe.bottom, keyboard.bottom));
            return new WindowInsetsCompat.Builder(insets)
                .setInsets(bars | WindowInsetsCompat.Type.ime(), Insets.NONE)
                .build();
        });
        content.post(() -> ViewCompat.requestApplyInsets(content));
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
