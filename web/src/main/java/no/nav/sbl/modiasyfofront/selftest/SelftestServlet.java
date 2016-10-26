package no.nav.sbl.modiasyfofront.selftest;

import no.nav.sbl.dialogarena.common.web.selftest.SelfTestBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import static java.lang.System.getProperty;
import static java.net.HttpURLConnection.HTTP_OK;
import static java.util.Arrays.asList;
import static no.nav.sbl.dialogarena.types.Pingable.Ping.*;

public class SelftestServlet extends SelfTestBaseServlet{
    private static final String APPLIKASJONS_NAVN = "modiasyfofront";
    private ApplicationContext ctx = null;

    @Override
    public void init() throws ServletException {
        ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
        super.init();
    }
    @Override
    protected String getApplicationName() {
        return APPLIKASJONS_NAVN;
    }

    @Override
    protected Collection<? extends Pingable> getPingables() {
        return asList(
                pingUrl("SYKEFRAVÆR_API", getProperty("sykefravaerapi.fss.url") + "/internal/isAlive", "application/json")
        );
    }

    private Pingable pingUrl(final String name, final String url, final String expectedResponseType) {
        return () -> {
            HttpURLConnection connection;
            try {
                connection = (HttpURLConnection) new URL(url).openConnection();
                connection.setConnectTimeout(10000);
                if (!(connection.getResponseCode() == HTTP_OK && expectedResponseType != null) || connection.getContentType().startsWith(expectedResponseType)) {
                    return lyktes(name);
                } else {
                    return feilet(name, new RuntimeException(connection.getResponseCode() + " " + connection.getResponseMessage()));
                }
            } catch (Exception e) {
                return feilet(name, e);
            }
        };
    }
}