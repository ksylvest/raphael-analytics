Raphael Analytics
=================

Analytics is a Raphael plugin designed to provide beautiful charts. The charts support animated beautiful curves and simple animations.

Installation
------------

To install copy the *images*, *javascripts*, and *stylesheets* directories into your project and add the following snippet to the header:

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js" type="text/javascript"></script>
    <script src="/javascript/raphael.js" type="text/javascript"></script>
    <script src="/javascript/raphael.analytics.js" type="text/javascript"></script>

Examples
--------

Setting up a analytics is easy. The following snippet is a good start:

    <div id="analytics"></div>
    
    <table>
      <tr id="text">
        <td>Jan</td>
        <td>Feb</td>
        <td>Mar</td>
        <td>Apr</td>
        <td>May</td>
        <td>Jun</td>
        <td>Jul</td>
        <td>Aug</td>
        <td>Sep</td>
        <td>Oct</td>
        <td>Nov</td>
        <td>Dec</td>
      </tr>
      <tr id="data">
        <td>10000</td>
        <td>20000</td>
        <td>30000</td>
        <td>40000</td>
        <td>50000</td>
        <td>60000</td>
        <td>60000</td>
        <td>50000</td>
        <td>40000</td>
        <td>30000</td>
        <td>20000</td>
        <td>10000</td>
      </tr>
    </table>
      
    <script type="text/javascript">
      $('#analytics').analytics({
        text: "#text",
        data: "#data",
      });
    </script>

    <script type="text/javascript">
      $('#analytics').analytics({
        text: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [10000, 20000, 30000, 40000, 50000, 60000, 60000, 50000, 40000, 30000, 20000, 10000],
      });
    </script>

Copyright
---------

Copyright (c) 2010 Kevin Sylvestre. See LICENSE for details.
